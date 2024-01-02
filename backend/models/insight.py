from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Insight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    end_year = db.Column(db.String)
    intensity = db.Column(db.Integer)
    sector = db.Column(db.String)
    topic = db.Column(db.String)
    insight = db.Column(db.String)
    url = db.Column(db.String)
    region = db.Column(db.String)
    start_year = db.Column(db.String)
    impact = db.Column(db.String)
    added = db.Column(db.String)
    published = db.Column(db.String)
    country = db.Column(db.String)
    relevance = db.Column(db.Integer)
    pestle = db.Column(db.String)
    source = db.Column(db.String)
    title = db.Column(db.String)
    likelihood = db.Column(db.Integer)
