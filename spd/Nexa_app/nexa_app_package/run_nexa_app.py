from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

# Import backend logic
import backend.nexa as nexa

app = Flask(__name__, static_folder="frontend/project/dist")
CORS(app)
app.config["SECRET_KEY"] = "nexa_secret_key"

# ==== Serve Frontend ====
@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static(path):
    # If the requested path does not exist, serve index.html (for SPA routing)
    if not os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, "index.html")
    return send_from_directory(app.static_folder, path)

# ==== API Routes ====
app.add_url_rule("/api/register", view_func=nexa.register, methods=["POST"])
app.add_url_rule("/api/login", view_func=nexa.login, methods=["POST"])
app.add_url_rule("/api/profile/<did>", view_func=nexa.profile, methods=["GET", "POST"])
app.add_url_rule("/api/post", view_func=nexa.create_post, methods=["POST"])
app.add_url_rule("/api/posts", view_func=nexa.get_posts, methods=["GET"])
# app.add_url_rule("/api/reply/<parent_id>", view_func=nexa.get_replies, methods=["GET"])
app.add_url_rule("/api/search", view_func=nexa.search_posts, methods=["GET"])
app.add_url_rule("/api/like/<post_id>", view_func=nexa.like_post, methods=["POST"])
app.add_url_rule("/api/follow/<target_did>", view_func=nexa.follow_user, methods=["POST"])
app.add_url_rule("/api/unfollow/<target_did>", view_func=nexa.unfollow_user, methods=["POST"])
app.add_url_rule("/api/followers/<did>", view_func=nexa.get_followers, methods=["GET"])
app.add_url_rule("/api/following/<did>", view_func=nexa.get_following, methods=["GET"])
app.add_url_rule("/api/coins/<did>", view_func=nexa.get_coin_balance, methods=["GET"])
app.add_url_rule("/api/transfer", view_func=nexa.transfer_coins, methods=["POST"])
app.add_url_rule("/api/leaderboard", view_func=nexa.coin_leaderboard, methods=["GET"])
app.add_url_rule("/api/message", view_func=nexa.send_message, methods=["POST"])
app.add_url_rule("/api/messages/<did>", view_func=nexa.get_messages, methods=["GET"])
app.add_url_rule("/api/message/<message_id>", view_func=nexa.get_message, methods=["GET"])
app.add_url_rule("/api/messages/between", view_func=nexa.get_messages_between, methods=["GET"])

# ==== Run Server ====
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
