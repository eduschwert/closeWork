import { Title } from "../../../components/Title";
import { StyledContainerStars, StyledDescription } from "./style";
import star from "../../../assets/star.svg";
import { iListComments, iListServiceHome } from "../../../context/type";

export interface iPropsDescriptionMoreInfo {
  service: iListServiceHome;
  listComments: iListComments[];
}
export const DescriptionMoreInfo = ({
  service,
  listComments,
}: iPropsDescriptionMoreInfo) => {
  let averageRate;

  listComments.length !== 0
    ? (averageRate =
        listComments.reduce(
          (currentSum, currentRate) => currentSum + currentRate.service_rating,
          0
        ) / listComments.length).toFixed(1)
    : (averageRate = "Sem avaliações no momento");

  return (
    <StyledDescription>
      <div>
        <div>
      <Title colorTitle="blue-1" type="Heading3">Tipo de serviço:</Title>
        <Title colorTitle="blue-1" type="Heading2">
          {service.kind_of_service}
        </Title>
        </div>
        <div>
        <Title colorTitle="blue-1" type="Heading3">Avaliação:</Title>
        <StyledContainerStars>
          {typeof averageRate === "number" && <img src={star} alt="" />}

          <Title colorTitle="blue-1" type="Heading3">
            {averageRate}
          </Title>
        </StyledContainerStars>
        </div>
      
        <Title colorTitle="blue-1" type="Heading3">Descrição do serviço:</Title>
        <Title colorTitle="blue-1" type="Headline">
          {service.description}
        </Title>

      </div>
    </StyledDescription>
  );
};
