from flask import Flask, request, jsonify 
from flask_cors import CORS 
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Mock database (replace with real DB later)
campaigns_db = []

@app.route('/api/campaigns', methods=['GET', 'POST'])
def handle_campaigns():
    if request.method == 'POST':
        # Save uploaded campaign data
        data = request.json
        campaign = {
            'id': len(campaigns_db) + 1,
            'name': data.get('name', 'Unnamed Campaign'),
            'banner_url': data.get('banner_url'),
            'targeting': data.get('targeting', {}),
            'status': 'Draft',
            'created_at': datetime.now().isoformat()
        }
        campaigns_db.append(campaign)
        return jsonify(campaign), 201
    else:
        # Return all campaigns
        return jsonify(campaigns_db)

if __name__ == '__main__':
    app.run(debug=True, port=5000)