import React from 'react';
import { shallow } from 'enzyme';
import { testColumnProps } from '../__mocks__/mocked_components/mockedFeedbackColumn';
import FeedbackColumn from '../feedbackColumn';
import FeedbackItem from '../feedbackItem';
import { IColumnItem } from '../feedbackBoard';

describe('Feedback Column ', () => {
  it('can be rendered', () => {
    const wrapper = shallow(<FeedbackColumn {...testColumnProps} />);
    expect(wrapper.prop('className')).toBe('feedback-column');
  });

  describe('child feedback items', () => {

    testColumnProps.isDataLoaded = true;

    it('can be rendered', () => {
      const wrapper = shallow(<FeedbackColumn {...testColumnProps} />);
      const feedbackItemProps = FeedbackColumn.createFeedbackItemProps(testColumnProps, testColumnProps.columnItems[0], true);

      expect(wrapper.containsMatchingElement(<FeedbackItem key={feedbackItemProps.id} {...feedbackItemProps} />)).toEqual(true);
    });

    it('should render with original accent color when the column ids are the same', () => {
      const expectedAccentColor: string = testColumnProps.accentColor;
      const feedbackItemProps = FeedbackColumn.createFeedbackItemProps(testColumnProps, testColumnProps.columnItems[0], true);

      expect(feedbackItemProps.accentColor).toEqual(expectedAccentColor);
    });

    it('should render with original column accent color when the columnName is All', () => {
      const columnItem: IColumnItem = testColumnProps.columnItems[0];
      const expectedAccentColor: string = testColumnProps.columns[columnItem.feedbackItem.originalColumnId]?.columnProperties?.accentColor;

      testColumnProps.accentColor = 'someOtherColor';
      testColumnProps.columnId = 'some-other-column-uuid';
      testColumnProps.columnName = 'All';

      const feedbackItemProps = FeedbackColumn.createFeedbackItemProps(testColumnProps, testColumnProps.columnItems[0], true);

      expect(feedbackItemProps.accentColor).toEqual(expectedAccentColor);
    });

    it('should render with column accent color when the columnName is not All', () => {
      const originalColor: string = testColumnProps.accentColor;
      testColumnProps.accentColor = 'someOtherColor';
      testColumnProps.columnName = 'someOtherColumn';

      const feedbackItemProps = FeedbackColumn.createFeedbackItemProps(testColumnProps, testColumnProps.columnItems[0], true);

      expect(feedbackItemProps.accentColor).toEqual(originalColor);
    });
  })

});
