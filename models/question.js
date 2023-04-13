const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        option:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Options",
            },

        ],
        vote:{
            type:Boolean,
        },
    },
    {
        timestamps:true,
    }
);

const Question = mongoose.model("Question",questionSchema);

module.exports = Question;