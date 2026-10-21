interface EvaluationInfo {
  id: string;
  orderInfo: null;
  member: null;
  score: number;
  tags: null;
  content: string;
  pictures: null;
  officialReply: null;
  praiseCount: number;
  createTime: string;
  praisePercent: number;
}

interface HotByDay {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  orderNum: number;
}

interface SimilarProduct {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  olderNum: number;
}

interface DetailProperties {
  name: string;
  value: string;
}

interface Details {
  pictures: string[];
  properties: DetailProperties[];
}

interface Parent {
  id: string;
  name: string;
  layer: number;
  parent: null;
}

interface Categories {
  id: string;
  name: string;
  layer: String;
  parent: Parent;
}

interface SkusSpecs {
  name: string;
  valueName: string;
}

interface Skus {
  id: string;
  skuCode: string;
  price: string;
  oldPrice: string;
  inventory: number;
  picture: string;
  specs: SkusSpecs[];
}

interface SpecsItemValueItem {
  name: string;
  picture: string;
  desc: string;
}

interface SpecsItem {
  name: string;
  id: string;
  value: SpecsItemValueItem[];
}
interface Brand {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  picture: string;
  type: null;
  desc: null;
  place: null;
  salesCount: number;
  commentCount: number;
  collection: number;
  mainVideos: [];
  collectCount: number;
  videoScale: number;
}

export interface Result {
  id: string;
  name: string;
  spuCode: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: number;
  inventory: number;
  brand: Brand;
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: [];
  videoScale: number;
  mainPictures: string[];
  specs: SpecsItem[];
  skus: Skus[];
  categories: Categories[];
  details: Details;
  isPreSale: false;
  isCollect: null;
  recommends: null;
  userAddresses: null;
  similarProducts: SimilarProduct[];
  hotByDay: HotByDay[];
  evaluationInfo: EvaluationInfo;
}

export interface Res {
  code: string;
  msg: string;
  result: Result;
}
