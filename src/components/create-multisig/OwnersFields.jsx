import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form as BForm,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { ErrorMessage, Field, FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OwnersFields = ({
  values,
  touched,
  errors,
  setFieldValue,
  validateForm,
}) => (
  <>
    {typeof errors.entities === 'string' ? (
      <BForm.Control.Feedback style={{ display: 'block' }} type="invalid">
        {errors.entities}
      </BForm.Control.Feedback>
    ) : null}

    <FieldArray name="entities" validateOnChange={false}>
      {(arrayHelpers) => (
        <div>
          {values.entities.map((entity, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <BForm.Group key={index} style={{ marginBottom: '10px' }}>
              <InputGroup>
                <Field
                  type="text"
                  name={`entities[${index}].value`}
                  id={`entities[${index}].value`}
                  aria-label={`entities[${index}].value`}
                  placeholder={
                    entity.isPubKey ? 'Public key (base58 or hex)' : 'tz1...'
                  }
                  as={BForm.Control}
                  size="sm"
                  isInvalid={
                    errors.entities &&
                    touched.entities &&
                    errors.entities[index] &&
                    touched.entities[index] &&
                    !!errors.entities[index].value &&
                    touched.entities[index].value
                  }
                  isValid={
                    errors.entities &&
                    touched.entities &&
                    errors.entities[index] &&
                    touched.entities[index] &&
                    !errors.entities[index].value &&
                    touched.entities[index].value
                  }
                  style={{ maxWidth: '500px' }}
                />
                <InputGroup.Append>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Switch to accept{' '}
                        {values.entities[index].isPubKey
                          ? 'an address'
                          : 'a public key'}
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="link"
                      style={{ paddingTop: 0, paddingBottom: 0 }}
                      onClick={() => {
                        setFieldValue(
                          `entities[${index}].isPubKey`,
                          !values.entities[index].isPubKey,
                        );
                      }}
                    >
                      <FontAwesomeIcon icon="retweet" />
                    </Button>
                  </OverlayTrigger>

                  {/* {index > 0 ? ( */}
                  {/*  <Button */}
                  {/*    variant="link" */}
                  {/*    style={{ paddingTop: 0, paddingBottom: 0 }} */}
                  {/*    onClick={() => { */}
                  {/*      arrayHelpers.remove(index); */}
                  {/*      setTimeout(() => { */}
                  {/*        validateForm(); */}
                  {/*      }); */}
                  {/*    }} */}
                  {/*  > */}
                  {/*    <FontAwesomeIcon icon="trash-alt" /> */}
                  {/*  </Button> */}
                  {/* ) : ( */}
                  {/*  '' */}
                  {/* )} */}
                  {values.entities.length > 1 ? (
                    <Button
                      variant="link"
                      style={{ paddingTop: 0, paddingBottom: 0 }}
                      onClick={() => {
                        arrayHelpers.remove(index);
                        setTimeout(() => {
                          validateForm();
                        });
                      }}
                    >
                      <FontAwesomeIcon icon="trash-alt" />
                    </Button>
                  ) : (
                    ''
                  )}
                </InputGroup.Append>
                {typeof errors.entities !== 'string' ? (
                  <ErrorMessage
                    name={`entities[${index}].value`}
                    component={BForm.Control.Feedback}
                    type="invalid"
                  />
                ) : null}
              </InputGroup>
            </BForm.Group>
          ))}
          <div style={{ maxWidth: '500px', textAlign: 'center' }}>
            <Button
              variant="link"
              onClick={() =>
                arrayHelpers.push({
                  value: '',
                  isPubKey: false,
                })
              }
            >
              <FontAwesomeIcon icon="plus" />
            </Button>
          </div>
        </div>
      )}
    </FieldArray>
  </>
);

OwnersFields.propTypes = {
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
};

export default OwnersFields;
