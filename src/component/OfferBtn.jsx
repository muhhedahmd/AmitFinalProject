import styled from '@emotion/styled';
import React from 'react';

const StyledContainer = styled.div({
  position: 'relative',
  display: 'inline-block',
});

const StyledOfferBtn = styled.button(({ fontSize }) => ({
  '&:hover::before': {
    width: '51%',
  },

  '&:hover::after': {
    width: '55%',
  },

  ':hover': {
    color: "#ffff    !important",
  },

  '::before': {
    zIndex:"-1",
    transition:".4s",
    position: 'absolute',
    left: '0',
    top: '-1%',
    content: '""',
    width: '0%',
    backgroundColor: '#f56f',
    height: '106%',
    borderRadius: '12px 0 0 12px',
  },

  '::after': {
        zIndex:"-1",
    transition:".4s",
    border: '1px solid #f56f',
    borderRadius: '0 12px 12px 0',
    position: 'absolute',
    right: '-4%',
    top: '-1%',
    content: '""',
    width: '0%',
    backgroundColor: '#f56f',
    height: '106%',
  },
  overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  transition: '.4s',
  margin: '1.5rem 0',
  padding: '.7rem 1.3rem',
  border: '1px solid #f56f',
  borderRadius: '12px',
  fontSize: fontSize || '1rem',
  color: '#f56f',
  background:"transparent"
}));

const OfferBtn = ({ children }) => {
  return (
    <StyledContainer>
      <StyledOfferBtn>{children}</StyledOfferBtn>
      <div></div>
    </StyledContainer>
  );
};

export default OfferBtn;
