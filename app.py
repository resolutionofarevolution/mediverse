from flask import Flask, render_template, request
import os

app = Flask(__name__)

# ==========================================
# Configuration
# ==========================================

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ==========================================
# Landing Page
# ==========================================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================================
# Upload Page
# ==========================================

@app.route("/upload")
def upload():
    return render_template("upload.html")


# ==========================================
# Upload Prescription
# ==========================================

@app.route("/upload-prescription", methods=["POST"])
def upload_prescription():

    if "prescription" not in request.files:
        return "No file selected"

    file = request.files["prescription"]

    if file.filename == "":
        return "No file selected"

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(filepath)

    return render_template(
        "processing.html",
        filename=file.filename
    )


# ==========================================
# Processing Page (Optional Direct Access)
# ==========================================

@app.route("/processing")
def processing():
    return render_template("processing.html")


# ==========================================
# Detected Medicines
# ==========================================

@app.route("/detected")
def detected():

    medicines = [

        {
            "detected": "PCM 650",
            "name": "Dolo 650 Tablet",
            "company": "Micro Labs",
            "score": "98%",
            "price": 32,
            "qty": 2,
            "unit": "Strip"
        },

        {
            "detected": "Azithromycin",
            "name": "Azithromycin 500",
            "company": "Cipla",
            "score": "96%",
            "price": 145,
            "qty": 1,
            "unit": "Strip"
        },

        {
            "detected": "Pantop 40",
            "name": "Pantoprazole 40",
            "company": "Sun Pharma",
            "score": "94%",
            "price": 118,
            "qty": 1,
            "unit": "Strip"
        }

    ]

    return render_template(
        "detected.html",
        medicines=medicines
    )


# ==========================================
# Preview Page (Future)
# ==========================================

@app.route("/preview")
def preview():
    return render_template("preview.html")


# ==========================================
# Dashboard (Future)
# ==========================================

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/address")
def address():
    return render_template("address.html")
# ==========================================
# Run Application
# ==========================================

# if __name__ == "__main__":
#     app.run(debug=True)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )