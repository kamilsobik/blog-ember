import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    const user1 = this.store.createRecord('user', {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@admin.com',
      isAdmin: true,
      photoURL:
        'https://naukawpolsce.pl/sites/default/files/styles/strona_glowna_slider_750x420/public/202005/portretProboscis_monkey_%28Nasalis_larvatus%29_male_head_0.jpg?itok=4nPIZ3jj',
    });
    const user2 = this.store.createRecord('user', {
      id: 2,
      username: 'user',
      password: 'user123',
      email: 'user@user.com',
      photoURL:
        'https://www.gdzieindziej.eu/wp-content/uploads/2018/04/P1090053.webp',
    });
    await user1.save();
    await user2.save();

    const post1 = this.store.createRecord('post', {
      id: 1,
      owner: user1,
      title: 'Tytuł testowy 1',
      body: 'Zawartość testowa 1',
      isDeleted: false,
    });
    const post2 = this.store.createRecord('post', {
      id: 2,
      owner: user1,
      title: 'Tytuł testowy 2',
      body: 'Zawartość testowa 2',
      isDeleted: false,
    });
    const post3 = this.store.createRecord('post', {
      id: 3,
      owner: user2,
      title: 'Tytuł testowy 3',
      body: 'Zawartość testowa 3',
      isDeleted: false,
    });

    await post1.save();
    await post2.save();
    await post3.save();

    const like1 = {
      id: 1,
      user: user1,
      post: post3,
    };

    const like1Model = this.store.createRecord('like', like1);
    await like1Model.save();

    this._fixLikeRelationship();
  }

  _fixLikeRelationship() {
    const fetchLikes = async () => this.store.findAll('like');
    scheduleOnce('afterRender', this, fetchLikes);
  }
}
