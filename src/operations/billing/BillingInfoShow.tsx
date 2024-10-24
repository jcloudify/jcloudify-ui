import {BillingInfo} from "@jcloudify-api/typescript-client";
import {DateField, FunctionField, ShowBase} from "react-admin";
import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {CalendarMonth as CalendarMonthIcon} from "@mui/icons-material";
import {ShowLayout} from "@/operations/components/show";
import {ToRecord} from "@/providers";
import {colors} from "@/themes";

export const BillingInfoShow: React.FC<{
  targetId?: string;
  targetResource?: string;
}> = ({targetId = "*", targetResource = "*"}) => (
  <ShowBase
    resource="billingInfo"
    id={targetId}
    queryOptions={{meta: {targetResource}}}
  >
    <ShowLayout>
      <Card
        sx={{
          bgcolor: colors("dark-1"),
          color: colors("light"),
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-around"
            sx={{p: 2}}
          >
            <Stack direction="row" spacing={3} alignItems="center">
              <CalendarMonthIcon sx={{fontSize: 54}} />
              <Stack direction="column" spacing={1}>
                <DateField
                  source="end_time"
                  textTransform="capitalize"
                  variant="h5"
                  options={{
                    month: "long",
                  }}
                />
                <Typography variant="caption">Total Due</Typography>
              </Stack>
            </Stack>
            <FunctionField<ToRecord<BillingInfo>>
              render={(record) => (
                <Typography variant="h2">
                  $ {record.computed_price?.toFixed(2)}
                </Typography>
              )}
            />
          </Stack>
        </CardContent>
      </Card>
    </ShowLayout>
  </ShowBase>
);
