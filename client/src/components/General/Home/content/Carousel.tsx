import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import images from '../../../../assets/4950287_19874-removebg-preview.png'
const Carousel = () => {

    interface CustomArrowProps {
        className?: string;
        style?: React.CSSProperties;
        onClick?: () => void;
    }
    const slides = [
        { id: 1, content: 'Slide 1', bgColor: 'bg-red-500' },
        { id: 2, content: 'Slide 2', bgColor: 'bg-green-500' },
        { id: 3, content: 'Slide 3', bgColor: 'bg-blue-500' },
    ];

    const CustomPrevArrow: React.FC<CustomArrowProps> = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} p-5`}
                style={{ ...style, display: 'block', borderRadius: '100%' }}
                onClick={onClick}
            />
        );
    };

    const CustomNextArrow: React.FC<CustomArrowProps> = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', borderRadius: '50%' }}
                onClick={onClick}
            />
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };
    return (
        <div className="max-w-screen-md mx-auto py-16">
            <Slider  {...settings} >
                {slides.map(slide => (
                    <div key={slide.id} className={`h-64 w-3 flex items-center justify-center bg-transparent border rounded-xl gap-5`}>
                        <div>
                            <img src={images} alt="" />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
