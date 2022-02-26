import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TreeSelect, { TreeSelectProps as SelectProps } from "rc-tree-select";
import {
  TreeSelectContainer,
  DropdownStyles,
  StyledIcon,
  StyledLabel,
  TextLabelWrapper,
} from "./index.styled";
import "rc-tree-select/assets/index.less";
import { DefaultValueType } from "rc-tree-select/lib/interface";
import { TreeNodeProps } from "rc-tree-select/lib/TreeNode";
import {
  CANVAS_CLASSNAME,
  MODAL_PORTAL_CLASSNAME,
  TextSize,
} from "constants/WidgetConstants";
import { Button, Classes, InputGroup } from "@blueprintjs/core";
import { WidgetContainerDiff } from "widgets/WidgetUtils";
import Icon from "components/ads/Icon";
import { Colors } from "constants/Colors";
import { DefaultOptionType } from "rc-tree-select/lib/TreeSelect";

export interface TreeSelectProps
  extends Required<
    Pick<
      SelectProps,
      "disabled" | "placeholder" | "loading" | "dropdownStyle" | "allowClear"
    >
  > {
  value?: DefaultValueType;
  onChange: (value?: DefaultValueType, labelList?: ReactNode[]) => void;
  expandAll: boolean;
  labelText?: string;
  labelTextColor?: string;
  labelTextSize?: TextSize;
  labelStyle?: string;
  compactMode: boolean;
  dropDownWidth: number;
  width: number;
  isValid: boolean;
  filterText?: string;
  widgetId: string;
  isFilterable: boolean;
  options?: DefaultOptionType[];
}

const getSvg = (expanded: boolean) => (
  <i
    style={{
      cursor: "pointer",
      backgroundColor: "transparent",
      display: "inline-flex",
      width: "14px",
      height: "100%",
    }}
  >
    <StyledIcon
      className="switcher-icon"
      expanded={expanded}
      fillColor={Colors.GREY_10}
      name="dropdown"
    />
  </i>
);

const switcherIcon = (treeNode: TreeNodeProps) => {
  if (treeNode.isLeaf) {
    return (
      <i
        style={{
          cursor: "pointer",
          backgroundColor: "white",
          display: "inline-flex",
          width: "14px",
        }}
      />
    );
  }
  return getSvg(treeNode.expanded);
};

function SingleSelectTreeComponent({
  allowClear,
  compactMode,
  disabled,
  dropdownStyle,
  dropDownWidth,
  expandAll,
  filterText,
  isFilterable,
  isValid,
  labelStyle,
  labelText,
  labelTextColor,
  labelTextSize,
  loading,
  onChange,
  options,
  placeholder,
  value,
  widgetId,
  width,
}: TreeSelectProps): JSX.Element {
  const [key, setKey] = useState(Math.random());
  const [filter, setFilter] = useState(filterText ?? "");

  const _menu = useRef<HTMLElement | null>(null);

  // treeDefaultExpandAll is uncontrolled after first render,
  // using this to force render to respond to changes in expandAll
  useEffect(() => {
    setKey(Math.random());
  }, [expandAll]);

  const getDropdownPosition = useCallback(() => {
    const node = _menu.current;
    if (Boolean(node?.closest(`.${MODAL_PORTAL_CLASSNAME}`))) {
      return document.querySelector(
        `.${MODAL_PORTAL_CLASSNAME}`,
      ) as HTMLElement;
    }
    return document.querySelector(`.${CANVAS_CLASSNAME}`) as HTMLElement;
  }, []);
  const onClear = useCallback(() => onChange([], []), []);

  const clearButton = useMemo(
    () => (
      <Button
        disabled={disabled}
        icon="cross"
        minimal
        onClick={() => setFilter("")}
      />
    ),
    [],
  );
  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setFilter(event.target.value);
  };

  const dropdownRender = useCallback(
    (
      menu: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    ) => (
      <>
        {isFilterable ? (
          <InputGroup
            autoFocus
            leftIcon="search"
            onChange={onQueryChange}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Filter..."
            rightElement={clearButton}
            small
            type="text"
            value={filter}
          />
        ) : null}
        <div className={`${loading ? Classes.SKELETON : ""}`}>{menu}</div>
      </>
    ),
    [loading, isFilterable, filter],
  );

  return (
    <TreeSelectContainer
      compactMode={compactMode}
      isValid={isValid}
      ref={_menu as React.RefObject<HTMLDivElement>}
    >
      <DropdownStyles
        dropDownWidth={dropDownWidth}
        id={widgetId}
        parentWidth={width - WidgetContainerDiff}
      />
      {labelText && (
        <TextLabelWrapper compactMode={compactMode}>
          <StyledLabel
            $compactMode={compactMode}
            $disabled={disabled}
            $labelStyle={labelStyle}
            $labelText={labelText}
            $labelTextColor={labelTextColor}
            $labelTextSize={labelTextSize}
            className={`tree-select-label ${
              loading ? Classes.SKELETON : Classes.TEXT_OVERFLOW_ELLIPSIS
            }`}
            disabled={disabled}
          >
            {labelText}
          </StyledLabel>
        </TextLabelWrapper>
      )}
      <TreeSelect
        allowClear={allowClear}
        animation="slide-up"
        choiceTransitionName="rc-tree-select-selection__choice-zoom"
        className="rc-tree-select"
        clearIcon={
          <Icon
            className="clear-icon"
            fillColor={Colors.GREY_10}
            name="close-x"
          />
        }
        disabled={disabled}
        dropdownClassName={`tree-select-dropdown single-tree-select-dropdown treeselect-popover-width-${widgetId}`}
        dropdownRender={dropdownRender}
        dropdownStyle={dropdownStyle}
        filterTreeNode
        getPopupContainer={getDropdownPosition}
        inputIcon={
          <Icon
            className="dropdown-icon"
            fillColor={disabled ? Colors.GREY_7 : Colors.GREY_10}
            name="dropdown"
          />
        }
        key={key}
        loading={loading}
        maxTagCount={"responsive"}
        maxTagPlaceholder={(e) => `+${e.length} more`}
        notFoundContent="No Results Found"
        onChange={onChange}
        onClear={onClear}
        placeholder={placeholder}
        showArrow
        showSearch={false}
        style={{ width: "100%" }}
        switcherIcon={switcherIcon}
        transitionName="rc-tree-select-dropdown-slide-up"
        treeData={options}
        treeDefaultExpandAll={expandAll}
        treeIcon
        treeNodeFilterProp="label"
        value={value}
      />
    </TreeSelectContainer>
  );
}

export default SingleSelectTreeComponent;
