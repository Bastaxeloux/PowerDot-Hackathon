# PowerDot Hackathon - Predictive Maintenance Project

Hackathon realised with [Aymane Hamdaoui](https://github.com/Mamannne), [Nathan Rouillé](https://github.com/NathanRouille), [Titouan Duhazé](https://github.com/titiuo), [Adam Chgour](https://github.com/adamchgour), and [Maël Le Guillouzic](https://github.com/Bastaxeloux)

This repository contains our work developed during the PowerDot Hackathon, aiming at predicting failures and maintenance needs of electric vehicle charging stations.

The goal of our project was to leverage machine learning to proactively detect patterns leading to charger failures. Through predictive modeling, our solution intends to reduce downtime, improve service quality, and optimize maintenance operations.

We followed these main steps to build our solution:

## Data preparation

To construct our clean and informative dataset, we performed data extraction, preprocessing, and extensive feature engineering. This process involved two main notebooks that should be run sequentially:
- `Dataset1.ipynb`
- `Dataset2.ipynb`

These notebooks integrate and aggregate raw data from charging session logs (sessions.csv) and charging station error logs (ocpp.csv). We created multiple relevant features capturing short-term trends (rolling windows, error frequencies, failure rates, inactivity periods) designed specifically for predictive modeling.

We carefully handled data quality by removing duplicates, ensuring each event was unique per charger and per date.  

To accurately capture recent historical behavior and avoid data leakage, we implemented rolling windows combined with a temporal shift. 

Specifically, when calculating features such as the number of sessions or errors over the past seven days, we systematically excluded the current day's data to maintain the integrity of predictive modeling.  

This methodology allowed our models to learn patterns from strictly historical information, thus enhancing their predictive reliability and generalization capabilities.


## Target creation

To quantify failure probabilities effectively, we built a precise target variable using the notebook:
- `Target_creation.ipynb`

The target reflects the probability of failure based on session success rates, ensuring robust training and accurate model predictions.

## Modeling
We experimented with two different approaches:

Gradient Boosting (xgboost.ipynb): A powerful baseline using gradient boosting decision trees. Easy to implement and interpret, XGBoost delivered competitive performance and interpretability.

Temporal Convolutional Network (TCN.ipynb): A modern deep learning approach leveraging convolutional architectures tailored for sequential data. The TCN model captures temporal patterns more effectively, demonstrating improved capability in predicting failure events over time.

Feel free to explore each notebook to understand our implementation in-depth, reproduce our results, and get insights on how predictive maintenance can be approached efficiently.
