import { Typography } from "@material-tailwind/react";

const NormalSkeleton = () => {
    return <>
        <div className="max-w-full animate-pulse" >
            <Typography
                as="div"
                variant="h1"
                className="mb-4 h-3 w-56 rounded-full bg-gray-300" placeholder={undefined}                    >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300" placeholder={undefined}                    >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300" placeholder={undefined}                    >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300" placeholder={undefined}                    >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300" placeholder={undefined}                    >
                &nbsp;
            </Typography>
        </div>
    </>;
}
export default NormalSkeleton;