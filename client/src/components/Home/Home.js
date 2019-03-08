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
              <img src="carousel/1.png" alt="1" />
            </div>
            <div className="item">
              <img src="carousel/2.png" alt="2" />
            </div>
            <div className="item">
              <img src="carousel/3.png" alt="3" />
            </div>
            <div className="item">
              <img src="carousel/4.png" alt="4" />
            </div>
            <div className="item">
              <img src="carousel/5.png" alt="5" />
            </div>
            <div className="item">
              <img src="carousel/6.png" alt="6" />
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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptatibus nobis, tenetur molestiae esse consectetur ullam sit perspiciatis eius maiores atque necessitatibus distinctio corrupti! Qui quaerat ratione animi dicta officiis?
Non commodi et rem id. Incidunt dolores optio rem, qui temporibus neque laboriosam eaque! Obcaecati, quo ipsam! Dolores velit sed id nisi laboriosam accusantium quod rem deserunt, quaerat rerum facere.
Facilis provident aspernatur fugiat placeat vel magni nostrum, alias sed. Praesentium earum quas enim quibusdam, pariatur, sequi ut molestiae aliquam ipsam maxime accusamus corrupti dicta architecto eveniet illo sunt molestias.
Fugit officiis nobis natus assumenda error, perspiciatis dolor pariatur inventore deleniti distinctio expedita maxime facere reiciendis alias doloribus aspernatur? Eius rem hic recusandae sunt culpa consequatur impedit quidem suscipit aut!
Numquam debitis facilis ipsam. Earum corporis sequi nostrum eum quasi nesciunt reiciendis debitis vero, ab labore iste soluta. Sunt quas debitis fuga deserunt magni et placeat, qui aspernatur sequi dolores.
Nulla enim, a blanditiis similique quo voluptas modi adipisci veritatis inventore delectus laborum rerum ex facere eius vitae magni unde illum id facilis alias numquam ipsam minus. Dicta, blanditiis corporis.
Consequuntur error officia dolor consectetur eveniet mollitia maxime illum vel iste, recusandae facere libero fuga neque? Provident nesciunt quos molestiae, fugiat cum nisi, commodi nam nostrum, dolor qui aut. Necessitatibus!
Nostrum cupiditate illo atque exercitationem molestias excepturi aliquid culpa officia, ducimus quam saepe tempore explicabo, illum earum eum, ab amet id reiciendis quo incidunt dolore? Dolor, reprehenderit? Sunt, impedit rerum?
Ullam deserunt aspernatur accusamus nisi recusandae consequuntur porro iste similique, neque distinctio ducimus veniam dolorum aperiam laborum praesentium, earum unde sed corrupti ex vero voluptatibus non. Perspiciatis reprehenderit vitae tempora.
Veniam optio alias magni aut enim itaque! Eaque quidem voluptatem repellendus nam, inventore repellat distinctio ab aut magnam, quas aliquam provident aperiam, ex sunt? Numquam ratione eius officiis sint eos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptatibus nobis, tenetur molestiae esse consectetur ullam sit perspiciatis eius maiores atque necessitatibus distinctio corrupti! Qui quaerat ratione animi dicta officiis?
Non commodi et rem id. Incidunt dolores optio rem, qui temporibus neque laboriosam eaque! Obcaecati, quo ipsam! Dolores velit sed id nisi laboriosam accusantium quod rem deserunt, quaerat rerum facere.
Facilis provident aspernatur fugiat placeat vel magni nostrum, alias sed. Praesentium earum quas enim quibusdam, pariatur, sequi ut molestiae aliquam ipsam maxime accusamus corrupti dicta architecto eveniet illo sunt molestias.
Fugit officiis nobis natus assumenda error, perspiciatis dolor pariatur inventore deleniti distinctio expedita maxime facere reiciendis alias doloribus aspernatur? Eius rem hic recusandae sunt culpa consequatur impedit quidem suscipit aut!
Numquam debitis facilis ipsam. Earum corporis sequi nostrum eum quasi nesciunt reiciendis debitis vero, ab labore iste soluta. Sunt quas debitis fuga deserunt magni et placeat, qui aspernatur sequi dolores.
Nulla enim, a blanditiis similique quo voluptas modi adipisci veritatis inventore delectus laborum rerum ex facere</p>
      </div>
    );
  }
}

export default Home;