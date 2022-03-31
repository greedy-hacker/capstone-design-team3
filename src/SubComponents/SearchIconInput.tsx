import SearchIcon from '@mui/icons-material/Search';
import {Box, InputBase} from '@mui/material';
import * as React from 'react';

export default function SearchIconInput({
  value,
  onChange,
  placeholder,
}: {
  value?: any;
  onChange?: any;
  placeholder?: string;
}) {
  return (
    <Box
      sx={{
        border: '1px solid #E3E3E3',
        borderRadius: '40px',
        width: '100%',
        height: '40px',
        bgcolor: '#F2F2F2',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        mt: 1,
        mb: 3,
      }}
    >
      <SearchIcon fontSize="small" color="action" sx={{pl: 2, pr: 1}} />
      <InputBase
        size="small"
        placeholder={placeholder || '검색'}
        sx={{
          height: '30px',
          flex: 1
        }}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}
