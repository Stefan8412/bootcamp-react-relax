import React, { useContext } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { AuthContext } from './AuthProvider'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required!'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Password is required'),
})

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })
  const toast = useToast()

  const { signUp } = useContext(AuthContext)

  const onSubmit = (data) => {
    signUp(data)
    toast({
      title: 'Account created!',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid gap="4">
        <FormControl isRequired isInvalid={!!errors?.name?.message}>
          <FormLabel>Name</FormLabel>
          <Input placeholder="John Doe" {...register('name')} />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors?.email?.message}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="example@example.com" {...register('email')} />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors?.password?.message}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="your password" {...register('password')} />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>
      <Button w="full" mt="5" type="submit" colorScheme="green" isDisabled={!isDirty || !isValid}>
        Sign up
      </Button>
    </form>
  )
}
