import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItem from './ListItem';
import PlaceholderItem from './PlaceholderItem';

interface ListContainerProps {
  showCreateRecording: boolean;
}

const rec = [];

const ListContainer: React.FC<ListContainerProps> = ({ showCreateRecording }) => {
  return (
    <div className="bg-transparent min-h-screen h-[auto] w-9/12 m-auto mt-[5vh] mb-[20vh] rounded-sm ">
      <Box sx={{ width: '100%' }}>
        <Stack spacing={3}>
          {rec.length > 0 ? (
            rec.map((item, index) => <ListItem key={index}>Item {item}</ListItem>)
          ) : (
            <PlaceholderItem showCreateRecording={showCreateRecording} />
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default ListContainer;
