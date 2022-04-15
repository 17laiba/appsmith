import { Classes, ControlGroup, Label } from "@blueprintjs/core";
import styled from "styled-components";
import { Colors } from "constants/Colors";
import { FontStyleTypes, TextSize } from "constants/WidgetConstants";
import { DropdownOption } from "../constants";
import { Select } from "@blueprintjs/select";
import {
  BlueprintCSSTransform,
  createGlobalStyle,
} from "constants/DefaultTheme";
import { isEmptyOrNill } from "../../../utils/helpers";
import { lightenColor } from "widgets/WidgetUtils";
import { CommonSelectFilterStyle } from "widgets/MultiSelectWidgetV2/component/index.styled";

export const TextLabelWrapper = styled.div<{
  compactMode: boolean;
}>`
  ${(props) =>
    props.compactMode ? "&&& {margin-right: 5px;}" : "width: 100%;"}
  display: flex;
`;

export const StyledDiv = styled.div`
  display: flex;
`;
export const StyledLabel = styled(Label)<{
  $compactMode: boolean;
  $disabled: boolean;
  $labelText?: string;
  $labelTextColor?: string;
  $labelTextSize?: TextSize;
  $labelStyle?: string;
}>`
  overflow-y: hidden;
  text-overflow: ellipsis;
  width: ${(props) => (props.$compactMode ? "auto" : "100%")};
  text-align: left;
  color: ${(props) =>
    props.$labelTextColor
      ? props.$labelTextColor
      : props.$disabled
      ? Colors.GREY_8
      : "inherit"};
  font-size: ${(props) =>
    props.$labelTextSize ? props.$labelTextSize : "0.875rem"};
  font-weight: ${(props) =>
    props?.$labelStyle?.includes(FontStyleTypes.BOLD) ? "bold" : "normal"};
  font-style: ${(props) =>
    props?.$labelStyle?.includes(FontStyleTypes.ITALIC) ? "italic" : ""};
`;

export const StyledControlGroup = styled(ControlGroup)`
  flex-grow: 1;

  &&& > {
    span {
      height: 100%;
      max-width: 100%;
      & > span {
        height: 100%;
      }
      .cancel-icon {
        svg {
          width: 10px !important;
          height: 10px !important;
        }
      }
      .dropdown-icon {
        width: 20px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

const SingleDropDown = Select.ofType<DropdownOption>();
export const StyledSingleDropDown = styled(SingleDropDown)<{
  value: string;
  isValid: boolean;
  hasError?: boolean;
  borderRadius: string;
  boxShadow?: string;
  accentColor?: string;
}>`
  div {
    flex: 1 1 auto;
  }
  span {
    width: 100%;
    position: relative;
    & > div {
      height: 100%;
    }
  }
  &&&& .${Classes.BUTTON} {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    box-shadow: ${(props) => props.boxShadow} !important;
    background: white;
    min-height: 32px;
    padding-left: 12px;
    padding: 0px 10px;
    border-radius: ${(props) => props.borderRadius} !important;
    box-shadow: ${(props) => props.boxShadow} !important;
    border: 1px solid;
    transition: border-color 0.15s ease-in-out 0s,
      box-shadow 0.15s ease-in-out 0s;
    border-color: ${(props) =>
      props.hasError ? Colors.DANGER_SOLID : Colors.GREY_3};
    ${(props) =>
      props.isValid
        ? `
        &:hover {
          border-color: ${Colors.GREY_5};
        }
        &:focus {
          outline: 0;
          border-color:
            ${props.hasError ? Colors.DANGER_SOLID : props.accentColor};
          box-shadow:
            ${`0px 0px 0px 3px ${lightenColor(
              props.hasError ? Colors.DANGER_SOLID : props.accentColor,
            )} !important;`};
        }
      `
        : ""};
  }
  &&&&& .${Classes.POPOVER_OPEN} .${Classes.BUTTON} {
    outline: 0;
    ${(props) =>
      !props.hasError
        ? `
        border-color: ${
          props.hasError ? Colors.DANGER_SOLID : props.accentColor
        };
        box-shadow: ${`0px 0px 0px 3px ${lightenColor(
          props.hasError ? Colors.DANGER_SOLID : props.accentColor,
        )} !important;`};
      `
        : `border: 1px solid ${Colors.DANGER_SOLID};`}
  }
  &&&&& .${Classes.DISABLED} {
    background-color: ${Colors.GREY_1};
    border: 1px solid ${Colors.GREY_3};
    .${Classes.BUTTON_TEXT} {
      color: ${Colors.GREY_7};
    }
  }
  .${Classes.BUTTON_TEXT} {
    word-break: break-word;
    text-overflow: ellipsis;
    text-align: left;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: ${(props) =>
      !isEmptyOrNill(props.value) ? Colors.GREY_10 : Colors.GREY_6};
  }
  && {
    .${Classes.ICON} {
      width: fit-content;
      color: ${Colors.SLATE_GRAY};
    }
  }
`;

export const DropdownStyles = createGlobalStyle<{
  dropDownWidth: number;
  id: string;
  borderRadius: string;
  accentColor?: string;
}>`
${({ dropDownWidth, id }) => `
  .${id} {
    width: ${dropDownWidth}px !important;
  }
`}
  .select-popover-wrapper {
    box-shadow: 0 6px 20px 0px rgba(0, 0, 0, 0.15) !important;
    border-radius: ${({ borderRadius }) =>
      borderRadius === "1.5rem" ? `0.375rem` : borderRadius} !important;
    overflow: hidden;
    background: white;
    ${CommonSelectFilterStyle}
    && .${Classes.MENU} {
      margin-top: -3px;
      max-width: 100%;
      max-height: auto;
      min-width: 0px !important;
    }
    &&&& .${Classes.MENU_ITEM} {
      min-height: 38px;
      padding: 9px 12px;
      border-radius: 0;
      color: ${Colors.GREY_8};
      &:hover{
        background: ${({ accentColor }) => `${lightenColor(accentColor)}`};
      }
      &.is-focused{
        background: ${({ accentColor }) => `${lightenColor(accentColor)}`};
      }
      &.${Classes.ACTIVE} {
        background: ${({ accentColor }) => `${lightenColor(accentColor)}`};
        color: ${Colors.GREY_10};
        position:relative;
      }
    }
  }
`;

export const DropdownContainer = styled.div<{ compactMode: boolean }>`
  ${BlueprintCSSTransform}
  display: flex;
  flex-direction: ${(props) => (props.compactMode ? "row" : "column")};
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: ${(props) => (props.compactMode ? "10px" : "5px")};

  label.bp3-label {
    margin: 0;
  }
`;

export const MenuItem = styled.div<{
  accentColor?: string;
}>`
  & .menu-item-link {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-radius: 2px;
    color: inherit;
    line-height: 20px;
    padding: 5px 7px;
    text-decoration: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 0;

    min-height: 38px;
    padding: 9px 12px;
    color: ${Colors.DOVE_GRAY2};
    outline: none !important;
    background-color: transparent;

    &:hover {
      background-color: ${({ accentColor }) => lightenColor(accentColor)};
      color: ${Colors.GREY_10};
      position: relative;
    }
  }

  & .menu-item-active {
    background-color: ${Colors.NARVIK_GREEN};
  }

  && .has-focus {
    background-color: ${({ accentColor }) =>
      lightenColor(accentColor)} !important;
  }

  & .menu-item-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-word;
    flex-grow: 1;
    flex-shrink: 1;
    margin-right: 0;
  }
`;
