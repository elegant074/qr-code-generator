from flask import Flask, request, jsonify, render_template, send_file
import qrcode
import io

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate_qr", methods=["POST"])
def generate_qr():
    data = request.json.get("text", "")
    if not data:
        return jsonify({"error": "No text provided"}), 400
    
    # Генерация QR-кода
    qr = qrcode.QRCode(version=1, box_size=10, border=4)
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill="black", back_color="white")
    
    # Сохранение QR-кода в BytesIO
    buffer = io.BytesIO()
    img.save(buffer, "PNG")
    buffer.seek(0)
    
    return send_file(buffer, mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True)
