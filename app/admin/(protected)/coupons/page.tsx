import { revalidatePath } from "next/cache";
import {
  getCoupons,
  deleteCoupon,
} from "@/lib/actions/coupon";
import Link from "next/link";

export default async function CouponsPage() {
  const coupons =
    await getCoupons();

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

  <h1 className="text-3xl font-bold">
    Coupons
  </h1>

  <Link
    href="/admin/coupons/new"
    className="px-5 py-2 rounded-lg bg-[#447F98] text-white hover:bg-[#2F657C]"
  >
    New Coupon
  </Link>

</div>

      <div className="bg-white rounded-xl border p-6">

        {coupons.length === 0 ? (

          <p>No coupons found</p>

        ) : (

          <table className="w-full">

            <thead>
              <tr>
                <th className="text-left p-3">
                  Code
                </th>

                <th className="text-left p-3">
                  Discount
                </th>
                <th className="text-left p-3">
  Action
</th>
              </tr>
            </thead>

            <tbody>

              {coupons.map(
                (coupon) => (
                  <tr
                    key={coupon.id}
                    className="border-t"
                  >
                    <td className="p-3">
                      {coupon.code}
                    </td>

                    <td className="p-3">
                      {coupon.discount}%
                    </td>
                    <td className="p-3">

  <form
   action={async () => {
  "use server";

  await deleteCoupon(
    coupon.id
  );

  revalidatePath(
    "/admin/coupons"
  );
}}
  >

   <button
  type="submit"
  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
>
  Delete
</button>

  </form>

</td>
                  </tr>
                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}