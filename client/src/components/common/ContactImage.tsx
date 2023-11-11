
import { twMerge } from 'tailwind-merge';

interface ContactImageProps {
    className?: string;
    logo?: string;
}

const ContactImage: React.FC<ContactImageProps> = ({ className, logo }) => {
    return (
        <div className={twMerge("flex items-center justify-center font-bold h-9 w-9 rounded-full bg-gray-600", `${className}`)}>
            {logo}
        </div>
    );
}

export default ContactImage;