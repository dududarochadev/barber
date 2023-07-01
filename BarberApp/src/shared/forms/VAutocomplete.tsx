import { ClearRounded } from '@mui/icons-material';
import { Autocomplete, AutocompleteProps, IconButton, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useState } from 'react';


type TVAutocompleteProps = Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> & {
  name: string;
  label: string;
}

export const VAutocomplete: React.FC<TVAutocompleteProps> = ({ name, label, ...rest }) => {
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (
    <Autocomplete
      {...rest}
      fullWidth
      noOptionsText="Nenhum resultado encontrado"
      defaultValue={defaultValue}
      value={value}
      onChange={(event, value, reason) => { setValue(value); rest.onChange?.(event, value, reason); }}
      clearIcon={
        <IconButton
          onClick={() => setValue(null)}
          size="small"
          sx={{ position: 'absolute', top: -11, right: 4 }}>
          <ClearRounded fontSize="small" />
        </IconButton>
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};