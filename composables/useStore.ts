import { defineStore } from "pinia"

//混合存储设置
 
interface State {
    vote: string[]
}

export const useStore = defineStore('localStore', {
    /*blendStore(key),不同内容可以新建不同文件设置不同key*/
    state: (): State => ({
        vote: [],
    }),
    actions: {
        setVote(vote:string[]) {
            this.vote = vote
        }
    },
    // 注意：persist定义要做判断，因为localStorage/sessionStorage是客户端参数，所以需要加process.client
    persist: import.meta.client && [
        {
            key: 'vote',
            storage: localStorage,
            paths: ['vote']
        }
    ],
})