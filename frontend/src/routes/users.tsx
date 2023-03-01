import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  Grid,
  Container,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UserProfile from '../components/UserProfile';
import userService from '../services/user.service';
import { useAuth } from '../contexts/auth';

export async function loader() {
  const users = await userService.getUsers();
  return { users };
}

export default function Users() {
  const { users } = useLoaderData();
  const [user, setUser] = useState<User>();
  const { user: currentUser } = useAuth();

  const handleSelect = (user: User) => () => {
    console.log(user);
    setUser(user);
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} md={5}>
          <Paper>
            <List>
              {users.map((user) => {
                return (
                  <ListItem
                    key={user.uuid}
                    secondaryAction={
                      currentUser?.uuid !== user.uuid && (
                        <IconButton edge='end' aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                      )
                    }
                    disablePadding
                  >
                    <ListItemButton onClick={handleSelect(user)}>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.email}
                        secondary={user.first_name + ' ' + user.last_name}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} lg={5}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {user && <UserProfile userProfile={user}></UserProfile>}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}