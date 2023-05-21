import { BaseModel } from "./base.model";

export class EntryModel extends BaseModel {
  
  public create(userId: number, text = "", img = "") {
    return this.client.entry.create({
      data: { text: text, img: img, userId: userId },
    });
  }

  public async getAll(page: number) {
    return await this.client.entry.findMany({ take: 20, skip: page * 20, include: {user: {select: {name: true}}} });
  }

  public async delete(userId: number, entyId: number){
    const entryElement = await this.client.entry.findFirst({where: {id: entyId, userId: userId}})
    if(entryElement){
      const deleteRes = await this.client.entry.deleteMany({where: {id: entyId, userId: userId},})
      return entryElement
    }
    return entryElement
  }

  public async update(userId: number, entyId: number, text = '', filePath = ''){
    const updateState = {text} as any
    if(filePath){
      updateState["img"] = filePath
    }
    return this.client.entry.updateMany({where: {userId: userId, id: entyId},  data: updateState})
  }

  public async getCount(){
    return await this.client.entry.aggregate({_count: {id: true}})
  }
}
