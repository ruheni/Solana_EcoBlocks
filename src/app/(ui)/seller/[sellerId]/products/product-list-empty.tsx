import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Shared/Section';
import { Seller } from '@prisma/client';

interface ProductListProps {
  sellerId: string;
}

const ProductListEmpty: React.FC<ProductListProps> = ({ sellerId }) => {
  const authLink = `/seller/${sellerId}/products/add`;
  return (
    <Section>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link href={authLink}>
            <div className="relative h-96">
              <Image
                src="/images/add-product.jpg"
                fill={true}
                quality={80}
                style={{ objectFit: 'cover' }}
                alt="Start recycling"
                className="p-8 rounded-t-lg"
              />
            </div>
          </Link>

          <div className="px-5 pb-5">
            <Link href={authLink} className="flex items-center justify-center">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Create your first product
              </h5>
            </Link>

            <div className="flex items-center justify-center mt-7 mb-4">
              <Link href={authLink} className="btn btn-wide">
                Create Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProductListEmpty;
