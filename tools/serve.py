# Serves the repo the way `python -m http.server` does, plus one write: POST /save?path=...
# stores a review file, so a review page in design/ can keep Martin's verdicts in the repo
# next to the drawings they judge.
# Usage: python tools/serve.py [port]   (default 8765)
import json
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent.parent
DESIGN = ROOT / "design"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    # Nothing here is worth caching: icons get redrawn and review files rewritten constantly.
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        url = urlparse(self.path)
        if url.path != "/save":
            return self.send_error(404)
        target = (ROOT / parse_qs(url.query).get("path", [""])[0]).resolve()
        # The only thing a page may write is a review.json somewhere under design/.
        if target.name != "review.json" or DESIGN not in target.parents:
            return self.send_error(403, "only design/**/review.json can be written")
        try:
            data = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))))
        except ValueError:
            return self.send_error(400, "body is not JSON")
        target.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        self.send_response(204)
        self.end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
print(f"http://127.0.0.1:{port}/")
ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
