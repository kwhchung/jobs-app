import { FaPlus, FaChevronRight } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {
  Box,
  Button,
  Flex,
  Fieldset,
  Heading,
  HStack,
  Input,
  NativeSelect,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { HttpHandler } from 'msw';
import * as React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

type HTTPMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

type Values = {
  url: string;
  method: HTTPMethod;
  data: Array<{ key: string; value: string }>;
  headers: Array<{ key: string; value: string }>;
};

export function APIDevtools({ handlers }: { handlers?: HttpHandler[] }) {
  const [result, setResult] = React.useState<unknown>(null);
  const [error, setError] = React.useState<unknown>(null);

  const { register, control, handleSubmit, reset, formState, watch } =
    useForm<Values>({
      defaultValues: {
        method: 'get',
        url: '/',
      },
    });
  const {
    fields: data,
    append: appendField,
    remove: removeField,
  } = useFieldArray({
    control,
    name: 'data',
  });
  const {
    fields: headers,
    append: appendHeader,
    remove: removeHeader,
  } = useFieldArray({
    control,
    name: 'headers',
  });

  const handleReset = () => {
    reset({ method: 'get', url: '/', data: [], headers: [] });
    setResult(null);
    setError(null);
  };

  const onSubmit = async ({ url, method, data, headers }: Values) => {
    setError(null);
    setResult(null);

    try {
      const dataValue = data?.reduce<Record<string, string>>((acc, curr) => {
        if (curr.key) {
          acc[curr.key] = curr.value;
        }
        return acc;
      }, {});

      const headersValue = headers?.reduce<Record<string, string>>(
        (acc, curr) => {
          if (curr.key) {
            acc[curr.key] = curr.value;
          }
          return acc;
        },
        {}
      );

      const response = await axios({
        method,
        url,
        headers: headersValue,
        data: dataValue,
      });

      setResult(response);
    } catch (error) {
      const err = error as {
        response?: unknown;
      };
      setError(err.response || err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          await onSubmit(data);
        })}
      >
        <HStack gap="1">
          <Input placeholder="/" flex="5" {...register('url')} />
          <NativeSelect.Root flex="2" {...register('method')}>
            <NativeSelect.Field>
              <option value="get">GET</option>
              <option value="post">POST</option>
              <option value="patch">PATCH</option>
              <option value="put">PUT</option>
              <option value="delete">DELETE</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Button
            flex="1"
            loading={formState.isSubmitting}
            disabled={formState.isSubmitting}
            type="submit"
            bg="blue.500"
            _hover={ {
              bg: "blue.600"
            } }
          >
            <FaChevronRight />
            Send
          </Button>
          <Button
            flex="1"
            type="button"
            variant="subtle"
            onClick={() => handleReset()}
          >
            <FiRefreshCcw />
            Reset
          </Button>
        </HStack>
        <Box my="4">
          <Fieldset.Root>
            <Fieldset.Legend>Headers:</Fieldset.Legend>
            <VStack gap="1" w="full" mb="2">
              {headers.map((item, index) => (
                <HStack w="full" gap="1" key={item.id}>
                  <Input
                    placeholder="Key"
                    flex="2"
                    {...register(`headers.${index}.key`)}
                  />
                  <Input
                    placeholder="Value"
                    flex="2"
                    {...register(`headers.${index}.value`)}
                  />
                  <Button
                    bg="red.500"
                    _hover={ {
                      bg: "red.600"
                    } }
                    flex="1"
                    type="button"
                    onClick={() => removeHeader(index)}
                  >
                    <MdDelete />
                    Delete
                  </Button>
                </HStack>
              ))}
            </VStack>
            <Button
              w="full"
              type="button"
              variant="subtle"
              onClick={() => appendHeader({ key: '', value: '' })}
            >
              <FaPlus />
              Add Header
            </Button>
          </Fieldset.Root>
        </Box>
        {['post', 'patch', 'put'].includes(watch('method')) && (
          <Box my="4">
            <Fieldset.Root>
              <Fieldset.Legend>Data Fields:</Fieldset.Legend>
              <VStack gap="1" w="full" mb="2">
                {data.map((item, index) => (
                  <HStack w="full" gap="1" key={item.id}>
                    <Input
                      placeholder="Key"
                      flex="2"
                      {...register(`data.${index}.key`)}
                    />
                    <Input
                      placeholder="Value"
                      flex="2"
                      {...register(`data.${index}.value`)}
                    />
                    <Button
                      bg="red.500"
                      _hover={ {
                        bg: "red.600"
                      } }
                      flex="1"
                      type="button"
                      onClick={() => removeField(index)}
                    >
                      <MdDelete />
                      Delete
                    </Button>
                  </HStack>
                ))}
              </VStack>
              <Button
                w="full"
                type="button"
                variant="subtle"
                onClick={() => appendField({ key: '', value: '' })}
              >
                <FaPlus />
                Add Field
              </Button>
            </Fieldset.Root>
          </Box>
        )}
      </form>
      {result && (
        <Box p="2" mt="2" bg="gray.50" as="pre" w="full" overflow="auto">
          {JSON.stringify(result, null, 2)}
        </Box>
      )}
      {error && (
        <Box
          p="2"
          mt="2"
          bg="gray.50"
          color="red"
          as="pre"
          w="full"
          overflow="auto"
        >
          {JSON.stringify(error, null, 2)}
        </Box>
      )}
      {!result && !error && handlers && (
        <VStack mt="8">
          <Heading alignSelf="start" size="md">
            Available Mocked Endpoints ({handlers.length}) :
          </Heading>
          {handlers
            .map((handler) => ({
              url: handler.info.path.toString(),
              method: handler.info.method
                .toString()
                .toLowerCase() as HTTPMethod,
            }))
            .map((handler, index) => (
              <Flex
                bg={
                  watch('url') === handler.url &&
                  watch('method') === handler.method
                    ? 'blue.100'
                    : 'transparent'
                }
                w="full"
                alignItems="center"
                key={index}
                p="2"
              >
                <Box flex="4">{handler.url}</Box>
                <Box textTransform="uppercase" flex="1">
                  {handler.method}
                </Box>
                <Button
                  onClick={() => {
                    reset({
                      url: handler.url,
                      method: handler.method,
                    });
                  }}
                  flex="1"
                  variant="subtle"
                >
                  Select
                </Button>
              </Flex>
            ))}
        </VStack>
      )}
    </>
  );
}
