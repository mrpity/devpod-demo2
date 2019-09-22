import { PostsEffects } from './posts.effects';
import { ProfileEffects } from './profile.effects';
import { ResultsEffects } from './results.effects';
import { RequestsEffects } from './requests.effects';
import { WebPageEffects } from './webpage.effects';

export const effects: any[] = [PostsEffects, ResultsEffects, RequestsEffects, ProfileEffects, WebPageEffects];

export {
  PostsEffects,
  ResultsEffects,
  RequestsEffects,
  ProfileEffects,
  WebPageEffects
};

