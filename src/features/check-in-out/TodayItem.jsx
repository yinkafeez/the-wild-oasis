import styled from "styled-components";

import { Flag } from "../../ui/Flag";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {/* if unconfirmed */}
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}

      {/* if checked-in */}
      {status === "checked-in" && <Tag type="blue">Deporting</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />

      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {/* if unconfirmed */}
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}

      {/* if checked in */}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}
