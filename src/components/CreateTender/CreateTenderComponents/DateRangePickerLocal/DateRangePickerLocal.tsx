import { FC, useState } from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import styles from './DateRangePickerLocal.module.css'
// import {useDateFormatter} from "@react-aria/i18n";
import { parseDate } from "@internationalized/date";
import { RangeValue, CalendarDate } from "@nextui-org/react";
import { useCreateTenderState } from "@/store/createTenderStore";

const DateRangePickerLocal: FC = () => {
    const createTenderState = useCreateTenderState()

    const classNames = {
        base: styles["base"],
        label: styles["label"],
        calendar: styles["calendar"],
        selectorButton: styles["selector-button"],
        selectorIcon: styles["selector-icon"],
        popoverContent: styles["popover-content"],
        calendarContent: styles["calendar-content"],
        inputWrapper: styles["input-wrapper"],
        innerWrapper: styles["inner-wrapper"],
        startInput: styles["start-input"],
        endInput: styles["end-input"],
        input: styles["input"],
        segment: styles["segment"],
        separator: styles["separator"],
        bottomContent: styles["bottom-content"],
        timeInputWrapper: styles["time-input-wrapper"],
        helperWrapper: styles["helper-wrapper"],
        headerWrapper: styles["header-wrapper"],
        description: styles["description"],
        errorMessage: styles["error-message"],
        gridBodyRow: styles["grid-body-row"],
        gridBody: styles["grid-body"],
    }
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    const [value, setValue] = useState({
        start: parseDate("2024-04-01"),
        end: parseDate("2024-04-14"),
    });

    //   let formatter = useDateFormatter({dateStyle: "long"});
    //
    return (
        <DateRangePicker
            // className="max-w-xs"
            labelPlacement="outside-left"
            onFocus={() => setIsCalendarOpen(true)}
            onOpenChange={() => setIsCalendarOpen(prev => !prev)}
            isOpen={isCalendarOpen}
            value={value}
            onChange={(newVal: RangeValue<CalendarDate>) => { console.log(newVal); createTenderState.handleSimpleInput('work_start', new Date(newVal.start.year, newVal.start.month - 1, newVal.start.day, 3)); createTenderState.handleSimpleInput('work_end', new Date(newVal.end.year, newVal.end.month - 1, newVal.end.day, 3)); setValue(newVal) }}
            classNames={classNames}
        />
    );
}

export default DateRangePickerLocal;