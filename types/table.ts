export interface photo {
  id: number,           //桌号(1-31)
  url: string,          //图片链接
  point: number,        //点赞数
  created_at: string|Date,         //记录创建时间
}
