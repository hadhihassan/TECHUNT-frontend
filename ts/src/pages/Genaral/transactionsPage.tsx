import AfterLoginHeader from "../../components/General/Home/Header/afterLoginHeader";
import Footer from "../../components/General/Home/footer/footer";
import ListWallectHistory from "../../components/General/transaction/listWallectHistory";
import image from '../../assets/3714960.jpg'
import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../../redux/store";
import { getTransationHistory } from "../../services/commonApiService";
import { formatMongoDate } from "../../util/timeFormating";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { TABLE_HEAD } from "../../constant/columns";

interface HistoryPropos {
    from: string,
    to: string,
    Date: Date,
    forWhat: string,
    amount: number
    createdAt:Date
}

const TransactionsPage: React.FC = () => {
    const userData = useSelector((state: ROOTSTORE) => state.signup)
    const [histories, setHistories] = useState<HistoryPropos[]>([])
    useEffect(() => {
        getTransationHistory(userData?.role)
            .then((res: AxiosResponse) => {
                setHistories(res?.data?.data)
            }).catch((err: AxiosError) => {
                console.log(err)
            })
    }, [])
    return <>
        <div className="bg-blue-500 absolute -z-10 w-full sm:h-[10vh] md:h-[25vh] xl:h-[50vh] transition-transform duration-150" style={{ backgroundImage: image }}>
        </div>
        <div className="flex flex-col gap-10 text-white font-sans  xl:ml-20:mt-8  container m-10 mt-10">
            <div>  <Button
                className='border text-white flex  font-sans justify-center items-center rounded-xl '
                onClick={() => {
                    history.back()
                }}>
                <LeftCircleOutlined />
                Back
            </Button></div>
            <div className="font-semibold text-2xl font-sans">Transaction Histories</div>
            <div className="w-[90%] border border-gray-300 shadow-xl  flex flex-col rounded-xl h-auto bg-white">
                <Card className="h-full w-full" placeholder={undefined}>
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 text-center bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            className="text-gray-900 text-xl font-semibold leading-none opacity-70" placeholder={undefined}                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {histories?.map((transaction:HistoryPropos, index:number) => {
                                const isLast = index === histories.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal text-center" placeholder={undefined}                                            >
                                                {index+1}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal text-center" placeholder={undefined}                                            >
                                                {transaction.forWhat}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal text-center" placeholder={undefined}                                            >
                                                {transaction.amount}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="text-center font-normal" placeholder={undefined}                                            >
                                                {formatMongoDate(transaction?.createdAt)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                className={`font-medium text-center  ${transaction.from === userData.id ? "text-red-500" : "text-green-500"}`} placeholder={undefined}                                            >
                                                {transaction.from === userData.id ? "Payed" : "Recievied"}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
        <ListWallectHistory />
    </>
}
export default TransactionsPage