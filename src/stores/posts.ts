import { reactive, readonly } from "vue"

//ref  => number, String
//reactive => {}, map...

interface PostsState {
    foo: string
}

export class PostsStore {
    #state: PostsState

    constructor() {
        this.#state = reactive<PostsState>({
            foo: 'foo'
        })
    }

    getState() {
        return readonly(this.#state)
    }

    updateFoo(foo: string) {
        this.#state.foo = foo
    }
}

const store = new PostsStore

export function usePosts() {
    return store
}
