from flask import Flask, request, jsonify
from models.insight import Insight, db
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db.init_app(app)
CORS(app)

# Create the database and tables
with app.app_context():
    db.create_all()

@app.route('/insights', methods=['POST'])
def add_data():
    insights = request.get_json()

    if not isinstance(insights, list):
        return jsonify({'error': 'Data must be an array of objects'}), 400

    for data in insights:
        new_data = Insight(
            end_year=data.get('end_year'),
            intensity=data.get('intensity'),
            sector=data.get('sector'),
            topic=data.get('topic'),
            insight=data.get('insight'),
            url=data.get('url'),
            region=data.get('region'),
            start_year=data.get('start_year'),
            impact=data.get('impact'),
            added=data.get('added'),
            published=data.get('published'),
            country=data.get('country'),
            relevance=data.get('relevance'),
            pestle=data.get('pestle'),
            source=data.get('source'),
            title=data.get('title'),
            likelihood=data.get('likelihood')
        )

        db.session.add(new_data)

    db.session.commit()

    return jsonify({'message': 'Data added successfully'}), 200

@app.route('/insights/topics', methods=['GET'])
def get_all_topics():
    all_topics = Insight.query.with_entities(Insight.topic).distinct().all()
    topics_list = [topic[0] for topic in all_topics if topic[0] is not None and topic[0] != ""]

    return jsonify({'topics': topics_list}), 200

@app.route('/insights/regions', methods=['GET'])
def get_all_regions():
    all_regions = Insight.query.with_entities(Insight.region).distinct().all()
    regions_list = [region[0] for region in all_regions if region[0] is not None and region[0] != ""]

    return jsonify({'regions': regions_list}), 200

@app.route('/insights/sectors', methods=['GET'])
def get_all_sectors():
    all_sectors = Insight.query.with_entities(Insight.sector).distinct().all()
    sectors_list = [sector[0] for sector in all_sectors if sector[0] is not None and sector[0] != ""]

    return jsonify({'sectors': sectors_list}), 200

@app.route('/insights/countries', methods=['GET'])
def get_all_countries():
    all_countries = Insight.query.with_entities(Insight.country).distinct().all()
    countries_list = [country[0] for country in all_countries if country[0] is not None and country[0] != ""]

    return jsonify({'countries': countries_list}), 200

@app.route('/insights/pestles', methods=['GET'])
def get_all_pestles():
    all_pestles = Insight.query.with_entities(Insight.pestle).distinct().all()
    pestles_list = [pestle[0] for pestle in all_pestles if pestle[0] is not None and pestle[0] != ""]

    return jsonify({'pestles': pestles_list}), 200

@app.route('/insights', methods=['GET'])
def get_all_data():
    topic_filter = request.args.get('topic')
    region_filter = request.args.get('region')
    sector_filter = request.args.get('sector')
    country_filter = request.args.get('country')
    pestle_filter = request.args.get('pestle')

    filters = {}

    if topic_filter:
        filters['topic'] = topic_filter
    if region_filter:
        filters['region'] = region_filter
    if sector_filter:
        filters['sector'] = sector_filter
    if country_filter:
        filters['country'] = country_filter
    if pestle_filter:
        filters['pestle'] = pestle_filter

    all_data = Insight.query.filter_by(**filters).all()

    data_list = []

    for data in all_data:
        data_list.append({
            'end_year': data.end_year,
            'intensity': data.intensity,
            'sector': data.sector,
            'topic': data.topic,
            'insight': data.insight,
            'url': data.url,
            'region': data.region,
            'start_year': data.start_year,
            'impact': data.impact,
            'added': data.added,
            'published': data.published,
            'country': data.country,
            'relevance': data.relevance,
            'pestle': data.pestle,
            'source': data.source,
            'title': data.title,
            'likelihood': data.likelihood
        })

    return jsonify({'data': data_list}), 200

if __name__ == '__main__':
    app.run(debug=True)
