export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: null;
  platforms: Platforms;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  public_notice: null;
  additional_notices: any[];
  description: Description;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  public_interest_stats: PublicInterestStats;
  status_updates: any[];
  last_updated: string;
}

export interface Description {
  en: string;
}

export interface Image {
  thumb: string;
  small: string;
  large: string;
}

export interface Links {
  homepage: string[];
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
  announcement_url: string[];
  twitter_screen_name: string;
  facebook_username: string;
  bitcointalk_thread_identifier: null;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: ReposURL;
}

export interface ReposURL {
  github: string[];
  bitbucket: any[];
}

export interface Platforms {
  '': string;
}

export interface PublicInterestStats {
  alexa_rank: number;
  bing_matches: null;
}
