
import Transaction from "../models/Transaction.js"

export const index = async (req, res) => {
    const transaction = await Transaction.find({ user_id: req.user._id }).sort({ createdAt: -1 });

// const demo = await Transaction.aggregate([
//     {
//         $match:{user_id: req.user._id}
//     },
//     {
//             $group:{
//                 _id:{ $month:"$date"},
//                 transaction:{
//                     $push:{
//                         amount: "$amount",
//                         description: "$description",
//                         date: "$date",
//                     },
//                 },
//                 totalExpenses:{ $sum: "$amount"},
//             },
//     },
// ]);

    res.json({ data: transaction })
}

export const create = async (req, res) => {

    const { amount, description, date } = req.body;
    const transaction = new Transaction({
        amount,
        description,
        user_id: req.user._id,
        date,
    })
    await transaction.save()
    res.json({ message: "success" })
}

export const destroy = async (req, res) => {

    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ message: "success" })
}

export const update = async (req, res) => {
    await Transaction.updateOne({ _id: req.params.id },
        {
            $set: req.body
        });

    res.json({ message: "success" })
}