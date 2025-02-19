const TestnetDomains = {
  "test.near.social": true,
  "127.0.0.1": true,
};

export const NetworkId =
  window.location.hostname in TestnetDomains ? "testnet" : "mainnet";
export const ContractId =
  NetworkId === "testnet" ? "v1.social08.testnet" : "social.near";
const TestnetWidgets = {
  image: "eugenethedream/widget/Image",
  default: "eugenethedream/widget/Welcome",
  viewSource: "eugenethedream/widget/WidgetSource",
  widgetMetadataEditor: "eugenethedream/widget/WidgetMetadataEditor",
  widgetMetadata: "eugenethedream/widget/WidgetMetadata",
  profileImage: "eugenethedream/widget/ProfileImage",
  profilePage: "eugenethedream/widget/Profile",
  profileName: "eugenethedream/widget/ProfileName",
  profileInlineBlock: "eugenethedream/widget/Profile",
  notificationButton: "eugenethedream/widget/NotificationButton",
};

const MainnetWidgets = {
  image: "mob.near/widget/Image",
  default: "onsocial.near/widget/Homepage",
  viewSource: "mob.near/widget/WidgetSource",
  widgetMetadataEditor: "mob.near/widget/WidgetMetadataEditor",
  widgetMetadata: "mob.near/widget/WidgetMetadata",
  profileImage: "mob.near/widget/ProfileImage",
  notificationButton: "onsocial.near/widget/NotificationButton",
  searchButton: "onsocial.near/widget/SearchButton",
  profilePage: "onsocial.near/widget/ProfilePage",
  profileName: "patrick.near/widget/ProfileName",
  editorComponentSearch: "mob.near/widget/Editor.ComponentSearch",
  profileInlineBlock: "onsocial.near/widget/Profile.InlineBlock",
  viewHistory: "bozon.near/widget/WidgetHistory",
  starButton: "mob.near/widget/N.StarButton",
  search: "onsocial.near/widget/Search.Tabs",
  daos: "onsocial.near/widget/DAO.Tabs",
  messages: "onsocial.near/widget/PrivateMailbox",
  notifications: "onsocial.near/widget/NotificationFeed",
  onsocial: "onsocial.near/widget/DAO.Page?daoId=onsocial.sputnik-dao.near",
  communities: "onsocial.near/widget/DAO.Page",
  marketplace: "onsocial.near/widget/App.Index",
  daosettings: "onsocial.near/widget/DAO.Settings",
  communitiescreate: "onsocial.near/widget/DAO.Create",
  followStats: "onsocial.near/widget/FollowStats",
  
};

export const Widgets =
  NetworkId === "testnet" ? TestnetWidgets : MainnetWidgets;
