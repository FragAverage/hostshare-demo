type Props = {
  PricePerNight: number;
  Nights: number;
}

const pricing = (props: Props) => {
  return ({
    SubTotal: (props.PricePerNight * props.Nights).toFixed(2),
    CleaningFee: ((props.PricePerNight * props.Nights) / 4).toFixed(2),
    Total: ((props.PricePerNight * props.Nights) + ((props.PricePerNight * props.Nights) / 4)).toFixed(2),
  })
}

export default pricing