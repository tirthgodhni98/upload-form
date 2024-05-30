import * as yup from 'yup';

const schema = yup.object().shape({
  uploadDocument: yup.string().required(),
  document: yup.string().when('uploadDocument', {
    is: (val: string) => val == 'yes',
    then: () => yup.string().required('Document is required'),
    otherwise: () => yup.string().nullable()
  } as any)
});


export default schema;
