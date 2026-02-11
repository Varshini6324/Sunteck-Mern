import {Schema,model} from  'mongoose'

//Create user comment schema
const userCommentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    comment:{
        type:String
    }
})

//create Article schema
const articleSchema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:[true,"Author ID is required"]
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    category:{
        type:String,
        required:[true,"Category is required"]
    },
    content:{
        type:String,
        required:[true,"Content is required"]
    },
    comment:[userCommentSchema],
    isArticleActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    strict:true,
})

//Create article schema
export const ArticleModel=model("article",articleSchema)