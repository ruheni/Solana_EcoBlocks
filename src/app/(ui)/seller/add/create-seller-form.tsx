'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSellerFormValue, createSellerSchema } from '@/utils/form-validations';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export type SellerFormSchemaProps = {
  values?: Partial<CreateSellerFormValue>;
  onCreateRequest: (values: CreateSellerFormValue) => unknown;
};

const CreateSellerForm: React.FC<SellerFormSchemaProps> = ({ values, onCreateRequest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<CreateSellerFormValue>({ resolver: zodResolver(createSellerSchema) });

  useEffect(() => {
    if (values) {
      values.name && setValue('name', values.name);
      values.url && setValue('url', values.url);
      values.description && setValue('description', values.description);
      values.address && setValue('address', values.address);
    }
  }, [values, setValue]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLFormElement>) {
    console.log('handleOnChange', changeEvent);
  }

  const onSubmit = async (data: CreateSellerFormValue) => {
    console.log('onSubmit', data, isSubmitting);
    if (isSubmitting) {
      onCreateRequest(data);
    } else {
      // Check if seller name is already taken
      const sellerNameExists = await fetch(`/api/seller/nameExists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: data.name }),
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error('Error:', error);
          return { exists: false };
        })
        .finally(() => {
          setIsSubmitting(false);
        });
      if (sellerNameExists.exists) {
        setError('name', {
          type: 'manual',
          message: 'Business name is already taken',
        });
      } else {
        onCreateRequest(data);
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} onChange={handleOnChange}>
      <div className="grid grid-cols-2 gap-x-20">
        <Input
          id="name"
          label="What is your business name?"
          placeholder="Type here"
          required={true}
          disabled={isSubmitting}
          {...register('name')}
          error={errors?.name?.message}
        />
        <Input
          id="url"
          type="url"
          label="What is your business page?"
          placeholder="Type here"
          disabled={isSubmitting}
          {...register('url')}
          error={errors?.url?.message}
        />
        <Input
          id="address"
          label="What is your business address?"
          placeholder="Type here"
          disabled={isSubmitting}
          {...register('address')}
          error={errors?.address?.message}
        />
        <Textarea
          id="description"
          label="Tell us about your company"
          placeholder="Type here"
          disabled={isSubmitting}
          {...register('description')}
          error={errors?.description?.message}
        />

        <div className="col-span-2">
          <button className="btn" disabled={isSubmitting} type="submit">
            {isSubmitting && <span className="loading loading-spinner"></span>}
            Create Business
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateSellerForm;
