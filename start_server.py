# start_server.py - MkDocs 启动脚本（已修复 MHTML MIME 类型）
import mimetypes

# 注册 .mhtml 文件的 MIME 类型，使浏览器能正确渲染
mimetypes.add_type('multipart/related', '.mhtml')

# 启动 MkDocs
from mkdocs.__main__ import cli
cli(['serve', '--dev-addr', '127.0.0.1:8000'])
