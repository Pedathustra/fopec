if exists( select name from sys.procedures where name = 'insPerson')
begin
	drop proc insPerson
end
go

create proc insPerson
		@first_name varchar(255),
		@last_name varchar(255), 
		@middle_name varchar(255), 
		@username varchar(255), 
		@password varbinary(max),
		@is_active bit = 1
as 
	if exists(select * from person where username = @username)
	begin 
		return -1
	end 

	insert into person(
		first_name,
		last_name,
		middle_name,
		username,
		password,
		created,
		is_active
	) 
	values (
		@first_name,
		@last_name,
		@middle_name,
		@username,
		@password,
		getdate(),
		@is_active
	) 
	return 0
go