'use strict'

const Post = use ('App/Model/Post')
const Validator  = use('Validator')

class PostsController {

    * index (request, response){
        const posts = yield Post.all()
        yield response.sendView('home', { posts: posts.toJSON() })
    }

    * create (request, response){
        yield response.sendView('posts.create')
    }

    * store (request, response){
        const postData = request.only('title', 'content')

        const rules = {
            title: 'required',
            content: 'required'
        }

        const validation = yield Validator.validate(postData, rules) 

        if (validation.fails()) {
        yield request
            .withOnly('title', 'content')
            .andWith({ errors: validation.messages() })
            .flash() 

        response.redirect('back')
        return
        }

        yield Post.create(postData) 
        response.redirect('/')
    }
}

module.exports = PostsController
