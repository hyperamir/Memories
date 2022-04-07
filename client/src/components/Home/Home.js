import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, Paper, Button, AppBar, TextField } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Paginate from "../Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim()) {

    } else {
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems='stretch' spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <AppBar className={classes.appBarSearch} position="static" color='inherit'>
              <TextField
                name="search"
                variant='outlined'
                label='Search Memories'
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                variant='outlined'
                label='Search Tags'
              />
              <Button className={classes.searchButton} onClick={searchPost} variant="contained" color='primary'>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;