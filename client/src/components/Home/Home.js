import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <div id="carousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carousel" data-slide-to="0" className="active"></li>
            <li data-target="#carousel" data-slide-to="1"></li>
            <li data-target="#carousel" data-slide-to="2"></li>
            <li data-target="#carousel" data-slide-to="3"></li>
            <li data-target="#carousel" data-slide-to="4"></li>
            <li data-target="#carousel" data-slide-to="5"></li>
          </ol>          
          <div className="carousel-inner">
            <div className="item active">
              <img src="carousel/1.png" alt="Johnny" />
            </div>
            <div className="item">
              <img src="carousel/2.png" alt="Johnny" />
            </div>
            <div className="item">
              <img src="carousel/3.png" alt="Johnny" />
            </div>
            <div className="item">
              <img src="carousel/4.png" alt="Johnny" />
            </div>
            <div className="item">
              <img src="carousel/5.png" alt="Johnny" />
            </div>
            <div className="item">
              <img src="carousel/6.png" alt="Johnny" />
            </div>
          </div>
          
          <a className="left carousel-control" href="#carousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#carousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <h3>Health effects</h3>
        <p>Physical exercise is important for maintaining physical fitness and can contribute to maintaining a healthy weight, regulating digestive health, building and maintaining healthy bone density, muscle strength, and joint mobility, promoting physiological well-being, reducing surgical risks, and strengthening the immune system. Some studies indicate that exercise may increase life expectancy and the overall quality of life. People who participate in moderate to high levels of physical exercise have a lower mortality rate compared to individuals who by comparison are not physically active. Moderate levels of exercise have been correlated with preventing aging by reducing inflammatory potential. The majority of the benefits from exercise are achieved with around 3500 metabolic equivalent (MET) minutes per week. For example, climbing stairs 10 minutes, vacuuming 15 minutes, gardening 20 minutes, running 20 minutes, and walking or bicycling for transportation 25 minutes on a daily basis would together achieve about 3000 MET minutes a week. A lack of physical activity causes approximately 6% of the burden of disease from coronary heart disease, 7% of type 2 diabetes, 10% of breast cancer and 10% of colon cancer worldwide. Overall, physical inactivity causes 9% of premature mortality worldwide.</p>
        <h4>Fitness</h4>
        <p>Individuals can increase fitness following increases in physical activity levels. Increases in muscle size from resistance training is primarily determined by diet and testosterone. This genetic variation in improvement from training is one of the key physiological differences between elite athletes and the larger population. Studies have shown that exercising in middle age leads to better physical ability later in life. Early motor skills and development have also shown to be related to physical activity and performance later in life. Children who have more proficient motor skills early on are more inclined to being physically active, and thus tend to perform well in sports and have better fitness levels. Early motor proficiency has a positive correlation to childhood physical activity and fitness levels, while less proficiency in motor skills results in a tendency to partake in a more sedentary lifestyle. A 2015 meta-analysis demonstrated that high intensity training improved stamina more than lower intensity endurance training.</p>
        <h4>Cardiovascular system</h4>
        <p>The beneficial effect of exercise on the cardiovascular system is well documented. There is a direct correlation between physical inactivity and cardiovascular mortality, and physical inactivity is an independent risk factor for the development of coronary artery disease. Low levels of physical exercise increase the risk of cardiovascular diseases mortality. Children who participate in physical exercise experience greater loss of body fat and increased cardiovascular fitness. Studies have shown that academic stress in youth increases the risk of cardiovascular disease in later years; however, these risks can be greatly decreased with regular physical exercise. There is a dose-response relation between the amount of exercise performed from approximately 700–2000 kcal of energy expenditure per week and all-cause mortality and cardiovascular disease mortality in middle-aged and elderly populations. The greatest potential for reduced mortality is in the sedentary who become moderately active. Studies have shown that since heart disease is the leading cause of death in women, regular exercise in aging women leads to healthier cardiovascular profiles. Most beneficial effects of physical activity on cardiovascular disease mortality can be attained through moderate-intensity activity (40–60% of maximal oxygen uptake, depending on age). Persons who modify their behavior after myocardial infarction to include regular exercise have improved rates of survival. Persons who remain sedentary have the highest risk for all-cause and cardiovascular disease mortality. According to the American Heart Association, exercise reduces the risk of cardiovascular diseases, including heart attack and stroke.</p>
        <h4>Immune system</h4>
        <p>Although there have been hundreds of studies on physical exercise and the immune system, there is little direct evidence on its connection to illness. Epidemiological evidence suggests that moderate exercise has a beneficial effect on the human immune system; an effect which is modeled in a J curve. Moderate exercise has been associated with a 29% decreased incidence of upper respiratory tract infections (URTI), but studies of marathon runners found that their prolonged high-intensity exercise was associated with an increased risk of infection occurrence. However, another study did not find the effect. Immune cell functions are impaired following acute sessions of prolonged, high-intensity exercise, and some studies have found that athletes are at a higher risk for infections. Studies have shown that strenuous stress for long durations, such as training for a marathon, can suppress the immune system by decreasing the concentration of lymphocytes. The immune systems of athletes and nonathletes are generally similar. Athletes may have slightly elevated natural killer cell count and cytolytic action, but these are unlikely to be clinically significant. Vitamin C supplementation has been associated with lower incidence of upper respiratory tract infections in marathon runners. Biomarkers of inflammation such as C-reactive protein, which are associated with chronic diseases, are reduced in active individuals relative to sedentary individuals, and the positive effects of exercise may be due to its anti-inflammatory effects. In individuals with heart disease, exercise interventions lower blood levels of fibrinogen and C-reactive protein, an important cardiovascular risk marker. The depression in the immune system following acute bouts of exercise may be one of the mechanisms for this anti-inflammatory effect.</p>
      </div>
    );
  }
}

export default Home;