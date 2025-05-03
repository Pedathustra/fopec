if exists(select * from sys.procedures where name = 'updCompanyBusinessFocus')
begin 
	drop proc updCompanyBusinessFocus
end
go

create proc updCompanyBusinessFocus
	@business_focus_id int,
	@company_id int
as
	set nocount on;

	print('this table only has pk columns, so it lends itself to only insert and update mutations. This proc is a placeholder until more properties are added to warrant an update')
	go

