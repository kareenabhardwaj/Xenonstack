import pandas as pd
from sklearn.cluster import KMeans

# Sample properties data for the recommendation system
data = {
    'property_id': [1, 2, 3, 4, 5],
    'price': [300000, 450000, 250000, 600000, 400000],
    'location': ['Downtown', 'Suburbs', 'Suburbs', 'Downtown', 'Downtown'],
    'size': [1200, 1500, 1000, 1800, 1600],
}

# Convert data to DataFrame
df = pd.DataFrame(data)

# Features for clustering (Price and Size)
features = df[['price', 'size']]

# KMeans clustering for recommendation
kmeans = KMeans(n_clusters=2, random_state=42)
df['cluster'] = kmeans.fit_predict(features)

# Sample function for property recommendations
def recommend_property(user_preference):
    # Assuming user_preference is a dictionary with 'price' and 'size'
    user_df = pd.DataFrame([user_preference])
    
    # Predict which cluster the user falls into
    user_cluster = kmeans.predict(user_df[['price', 'size']])
    
    # Get properties from the same cluster
    recommended_properties = df[df['cluster'] == user_cluster[0]]
    
    return recommended_properties

# Example user preference
user_preference = {
    'price': 350000,
    'size': 1500
}

recommendations = recommend_property(user_preference)
print("Recommended Properties for User: ")
print(recommendations[['property_id', 'price', 'location', 'size']])
