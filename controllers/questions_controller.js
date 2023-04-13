const questions = require("../models/question");
const options = require("../models/option");

module.exports.create = function (req,res){
    questions.create(
        {title: req.body.title,vote:false},
        function(err,question){
            if(err){
                return res.json(500,{
                    message:"Question is not created",
                    data:err,
                });
            }
            if(question){
                return res.json(200,{
                    message:"Question Created",
                    data:question,
                });
            }else{
                return res.json(400,{
                    message:"Question not created",
                });
            }
        }
    )
}

module.exports.deleteQuestion = function(req,res){
    console.log(req.params.id);
    questions.findByIdAndDelete(
        {_id:req.params.id},
        function(err,deleteQ){
            if(err){
                return res.json(500,{
                    message:"Question cannot be deleted",
                    data:err,
                });
            }
            return res.json(200,{
                message:"Question deleted successfully",
            });
        }
    )

    options.deleteMany({question:req.params.id},function(err,deleteOption){
        if(err){
            return res.json(500,{
                message:"Cannot delete option",
                data:err,
            })
        }
        return res.json(200,{
            message:"options are deleted",
        });
    })
}

module.exports.addOptions = function(req,res){
    questions.findById({_id:req.params.id},function(err,question){
        if(err){
            return res.json(500,{
                message:"Cannot find question",
                data:err,
            })
        }
        if(question){
            const id = question.option.length + 1;
            options.create(
                {
                    id:question.option.length + 1,
                    question: req.params.id,
                    text:req.body.text,
                    votes:0,
                    link:`http://localhost:8000/options/${id}/add_vote`,
                },
                function (err,optionCreated){
                    if(err){
                        return res.json(500,{
                            message:"options not created",
                            data:err,
                        })
                    }
                    questions.update(
                        {_id:req.params.id},
                        {
                            $push:{option:[optionCreated._id]},
                        },
                        function(err,questionAndOption){
                            if(err){
                                return res.json(500,{
                                    message:"Question not updated",
                                    data:err,
                                })
                            }
                            return res.json(200,{
                                message: "Question and Option updated",
                            });
                        }


                    )
                    question.save();
                }
            );
        }else{
            return res.json(404,{
                message:"Not found",
                data:err,
            })
        }
    })
}

module.exports.showAllQuestions = async (req,res)=>{
    try{
        console.log('inside show questions')
        console.log(req.params.id)
        //find all questions and return
        let question = await questions.findById(req.params.id).populate({
            path:"option",
            
        })
        
        console.log(question)
        if(question){
            return res.status(200).json({
                message:"Hey, here are the questions",
                data:question,
            })
        }else{
            return res.status(400).json({
                message:"Question does not exists",
            })
        }
        }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            data:err,
        })
        }
}